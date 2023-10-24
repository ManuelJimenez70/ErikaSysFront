import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactApexChart from 'react-apexcharts';

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDate2, setStartDate2] = useState(new Date());
  const [endDate2, setEndDate2] = useState(new Date());
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false); // Estado para controlar la visualización del gráfico
  const [chartData, setChartData] = useState([]);
  const [showApexChart, setShowApexChart] = useState(false);
  const [options, setOptions] = useState({
    labels: [],
  });
  const optionsChart = {
    title: "Balance",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: {
      title: "Dias",
    },
    vAxis: {
      title: "Cantidad",
    },
  };

  useEffect(() => {
    const formattedStartDate = startDate2.toISOString().split('T')[0];
    const formattedEndDate = endDate2.toISOString().split('T')[0];
    //Para ver si funciona
    // Realiza la solicitud para obtener las acciones
    axios.get(`http://www.erikasys.somee.com/api/Action/getActionsByRangeDateType?dateI=${formattedStartDate}&dateF=${formattedEndDate}&type=out`)
      .then(response => {
        const responseData = response.data; // Listado de acciones

        // Calcula la cantidad de acciones por módulo dinámicamente
        const moduleCounts = {};

        responseData.forEach(action => {
          const moduleName = action.moduleName;
          if (!moduleCounts[moduleName]) {
            moduleCounts[moduleName] = 1;
          } else {
            moduleCounts[moduleName] += 1;
          }
        });

        // Extrae los nombres de módulos y sus conteos
        const moduleNames = Object.keys(moduleCounts);
        const moduleValues = moduleNames.map(moduleName => moduleCounts[moduleName]);
        console.log("Module names", moduleNames,"modulevalues",moduleValues)
        // Actualiza los datos del gráfico
        setChartData(moduleValues);

        // Actualiza las etiquetas del gráfico
        setOptions({
          labels: moduleNames,
          // Otras opciones de configuración del gráfico
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de las acciones:', error);
      });
  }, [startDate2, endDate2, showApexChart])


  useEffect(() => {
    if (showChart) {
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];

      // Hacer dos solicitudes GET separadas para las acciones 'in' y 'out'
      const apiUrlIn = `http://www.ErikaSys.somee.com/api/Action/getActionsByRangeDateType?dateI=${formattedStartDate}&dateF=${formattedEndDate}&type=in`;
      const apiUrlOut = `http://www.ErikaSys.somee.com/api/Action/getActionsByRangeDateType?dateI=${formattedStartDate}&dateF=${formattedEndDate}&type=out`;

      // Realizar las solicitudes GET a la API para 'in' y 'out'
      axios
        .all([axios.get(apiUrlIn), axios.get(apiUrlOut)])
        .then(axios.spread((responseIn, responseOut) => {
          // Combinar los datos de 'in' y 'out' en el formato adecuado para el gráfico
          const dataIn = responseIn.data;
          const dataOut = responseOut.data;
          console.log(dataIn)
          console.log(dataOut)

          // Procesar los datos para obtener las entradas y salidas por día (puedes ajustar esto según tus datos reales)
          const entriesByDay = {}; // Un objeto para almacenar las entradas por día
          const exitsByDay = {};   // Un objeto para almacenar las salidas por día

          dataIn.forEach(item => {
            const date = item.creationDate.value.split('T')[0];
            if (!entriesByDay[date]) {
              entriesByDay[date] = 0;
            }
            entriesByDay[date] += item.quantity.value;
          });

          dataOut.forEach(item => {
            const date = item.creationDate.value.split('T')[0];
            if (!exitsByDay[date]) {
              exitsByDay[date] = 0;
            }
            exitsByDay[date] += item.quantity.value;


          });

          // Crear el formato final para el gráfico
          const chartData = [['Dias', 'Entradas', 'Salidas']];
          const startDate = new Date(formattedStartDate);
          const endDate = new Date(formattedEndDate);
          const datesInRange = getDatesInRange(startDate, endDate);
          console.log(datesInRange);
          
          datesInRange.forEach(date => {
            console.log(date.substring(date.length-2, date.length));
            console.log(entriesByDay[date])

            chartData.push([date.substring(date.length-2, date.length), entriesByDay[date] || 0 , exitsByDay[date]|| 0]);
          });


          

          // Actualizar el estado 'data' con los datos combinados
          setData(chartData);
        }))
        .catch(error => {
          console.error('Error al obtener los datos de la API:', error);
        });
    }
  }, [startDate, endDate, showChart]);

  function getDatesInRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().slice(0, 10)); // Agrega la fecha al array en formato 'YYYY-MM-DD'
      currentDate.setDate(currentDate.getDate() + 1); // Incrementa la fecha en 1 día
    }

    return dateArray;
  }


  // Obtén el array de fechas en el rango
  


  const handleButtonClick = () => {
    setShowChart(true);
  };



  const handleApexChartButtonClick = () => {
    // Cuando se hace clic en el botón del gráfico de ApexCharts, mostrar el gráfico.
    setShowApexChart(true);
  };

  return (
    <div className='reports'>
      <h1>Reportes</h1>
      <div className="grid-container">
        <div className="container">
          <h2 className='titleReport'>Entradas ventas general</h2>
          <h3>Fecha inicial</h3>
          <DataPicker selected={startDate} onChange={date => setStartDate(date)} />
          <br></br>
          <h3>Fecha Final</h3>
          <DataPicker selected={endDate} onChange={date => setEndDate(date)} />
          <br></br>
          <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Mostrar</button>
          <div>
            {showChart && (
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={data}
                options={optionsChart}
              />
            )}
          </div>
        </div>
        <div className="container">
          <h2 className='titleReport'>Entradas ventas por modulo</h2>
          <h3>Fecha inicial</h3>
          <DataPicker selected={startDate2} onChange={date => setStartDate2(date)} />
          <br></br>
          <h3>Fecha Final</h3>
          <DataPicker selected={endDate2} onChange={date => setEndDate2(date)} />

          <div id="chart">
            <button type="button" className="btn btn-primary" onClick={handleApexChartButtonClick}>Mostrar</button>
            {showApexChart && (
              <ReactApexChart options={options} series={chartData} type="pie" width="380" />
            )}

          </div>
          <br></br>

        </div>
        {/* Agrega más reportes aquí siguiendo el mismo patrón */}
      </div>
    </div>
  );

}

export default Reports;