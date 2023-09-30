import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import DataPicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/reports.css';

function Reports() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false); // Estado para controlar la visualización del gráfico
  const options = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "bottom" },
  };

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
          Object.keys(entriesByDay).forEach(date => {
            chartData.push([date, entriesByDay[date], exitsByDay[date] || 0]);
          });

          // Actualizar el estado 'data' con los datos combinados
          setData(chartData);
        }))
        .catch(error => {
          console.error('Error al obtener los datos de la API:', error);
        });
    }
  }, [startDate, endDate, showChart]);

  const handleButtonClick = () => {
    setShowChart(true);
  };

  return (
    <div className='reports'>
      <h1>Reportes</h1>
      <div className="container">
        <h3>Fecha inicial</h3>
        <DataPicker selected={startDate} onChange={date => setStartDate(date)} />
        <br></br>
        <h3>Fecha Final</h3>
        <DataPicker selected={endDate} onChange={date => setEndDate(date)} />
        <br></br>
        <button type="button" class="btn btn-primary" onClick={handleButtonClick}>Mostrar</button>
      </div>
      <div>
        {showChart && (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        )}
      </div>
    </div>
  );
}

export default Reports;