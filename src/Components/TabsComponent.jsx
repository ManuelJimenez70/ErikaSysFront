import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import ReactApexChart from 'react-apexcharts';
import "../styles/Tabs.css";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';





function TabsComponent() {

    const currentDate = new Date().toISOString().split('T')[0];

    const [startDate2, setStartDate2] = useState(currentDate);
    const [endDate2, setEndDate2] = useState(currentDate);
    const [showChartPrueba, setShowChartPrueba] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [showApexChart, setShowApexChart] = useState(true);
    const [options, setOptions] = useState({
        labels: [],
    });
    const [selectedModule, setSelectedModule] = useState(1);

    const [startNuevo, setNuevo] = useState(currentDate);
    const [endNuevo, setEndNuevo] = useState(currentDate);

    const [charDataPrueba, setDataPrueba] = useState({

    });

    useEffect(() => {
        const formattedStartDate = startDate2;
        const formattedEndDate = endDate2;
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
                console.log("Module names", moduleNames, "modulevalues", moduleValues)
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

    ////////////////////////////////////////////////////////////////////////////////////////este
    useEffect(() => {
        if (showChartPrueba) {
            const formattedStartDate = startNuevo;
            const formattedEndDate = endNuevo;

            axios.get(`http://www.erikasys.somee.com/api/Action/getActionsByRangeDateModuleType?dateI=${formattedStartDate}&dateF=${formattedEndDate}&moduleId=${selectedModule}&type=out`)
                .then(response => {
                    const responseData = response.data; // Listado de acciones

                    // Filtra los datos para obtener solo los del módulo 1
                    const module1Data = responseData.filter(item => item.id_module === selectedModule);

                    // Obtén un arreglo de fechas dentro del rango
                    const dateRange = getDateRange(formattedStartDate, formattedEndDate);

                    // Agrupa los datos por fechas y suma las cantidades
                    const groupedData = module1Data.reduce((accumulator, current) => {
                        const date = current.creationDate.value.split('T')[0]; // Obtiene la fecha sin la hora
                        if (!accumulator[date]) {
                            accumulator[date] = 0;
                        }
                        accumulator[date] += current.quantity.value;
                        return accumulator;
                    }, {});

                    // Rellena las fechas faltantes con un valor de 0
                    dateRange.forEach(date => {
                        if (!groupedData[date]) {
                            groupedData[date] = 0;
                        }
                    });

                    // Prepara los datos en un formato adecuado para Recharts
                    const dataForRecharts = dateRange.map(date => ({
                        date,
                        totalQuantity: groupedData[date],
                    }));
                    setDataPrueba(dataForRecharts);
                    console.log(dataForRecharts);
                })
                .catch(error => {
                    console.error('Error al obtener los datos de las acciones:', error);
                });
        }
    }, [startNuevo, endNuevo, showChartPrueba, selectedModule]);


    function getDateRange(startDate, endDate) {
        const dateRange = [];
        const currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dateRange.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dateRange;
    }


    //


    useEffect(() => {
        if (showChartPrueba) {

            // axios.get(`http://www.erikasys.somee.com/api/Action/getActionsByRangeDateType?dateI=${formattedStartDate}&dateF=${formattedEndDate}&type=out`)
        }

    }, [showChartPrueba]);



    // Obtén el array de fechas en el rango


    const handleApexChartButtonClick = () => {
        // Cuando se hace clic en el botón del gráfico de ApexCharts, mostrar el gráfico.
        setShowApexChart(true);
    };

    const handleNuevoChart = () => {
        setShowChartPrueba(true);
    };
    const handleModuleChange = (event) => {
        setSelectedModule(event.target.value);
    };


    return (
        <div className='contentTabs'>
            <div className='main'>
                <input id="tab1" type="radio" name="tabs" />
                <label htmlFor="tab1">Ventas generales</label>

                <input id="tab2" type="radio" name="tabs" />
                <label htmlFor="tab2">Ventas por módulo</label>

                <section id="content1">
                    <div className="container">
                        <div className='datas'>
                            <div className='contentData'>
                                <input
                                    type='date'
                                    value={startNuevo}
                                    onChange={(event) => {
                                        setNuevo(new Date(event.target.value).toISOString().split('T')[0]);
                                    }}
                                />

                                <p>Fecha inicial</p>
                            </div>

                            <div className='contentData'>
                                <input
                                    type='date'
                                    value={endNuevo}
                                    onChange={(event) => {
                                        setEndNuevo(new Date(event.target.value).toISOString().split('T')[0]);
                                    }}
                                />
                                <p>Fecha final</p>
                            </div>
                            <p>Selecciona un modulo:</p>
                            <select id="module-select" value={selectedModule} onChange={handleModuleChange}>
                                <option value={1}>Recepción</option>
                                <option value={2}>Cafetería</option>
                                <option value={3}>Cocina</option>
                            </select>
                            <button type="button" className="btn btn-primary" onClick={handleNuevoChart}>Mostrar</button>

                        </div>

                        <div className='chart'>
                            {showChartPrueba && (
                                <BarChart width={600} height={400} data={charDataPrueba} >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        label={{ value: 'Días', position: 'insideBottom', offset: 0 }}
                                        dataKey="date"
                                        tickFormatter={(date) => {
                                            
                                            const parsedDate = new Date(date);
                                            const day = parsedDate.getDate(); // Obtiene el número del día
                                            return `${day}`;
                                        }}
                                    />
                                    
                                    <YAxis label={{ value: 'Cantidad', angle: -90, position: 'insideLeft' }} />
                                    <Bar dataKey="totalQuantity" fill="#82ca9d" />
                                    
                                </BarChart>

                            )}
                        </div>


                    </div>
                </section>

                <section id="content2">
                    <div className="container">

                        <div className='datas'>
                            <div className='contentData'>
                                <input
                                    type='date'
                                    value={startDate2}
                                    onChange={(event) => {
                                        setStartDate2(new Date(event.target.value).toISOString().split('T')[0]);
                                    }}
                                />

                                <p>Fecha inicial</p>
                            </div>

                            <div className='contentData'>
                                <input
                                    type='date'
                                    value={endDate2}
                                    onChange={(event) => {
                                        setEndDate2(new Date(event.target.value).toISOString().split('T')[0]);
                                    }}
                                />
                                <p>Fecha final</p>
                            </div>

                            <button type="button" className="btn btn-primary" onClick={handleApexChartButtonClick}>Mostrar</button>
                        </div>

                        <div className="chart">
                            {showApexChart && (
                                <ReactApexChart options={options} series={chartData} type="pie" width="380" />
                            )}

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TabsComponent;
