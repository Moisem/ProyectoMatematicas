import React, { useEffect, useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import * as MyLegend from "chartist-plugin-legend";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StopIcon from "@material-ui/icons/Stop";
import TocIcon from "@material-ui/icons/Toc";
// @material-ui/icons
import BarChartIcon from "@material-ui/icons/BarChart";
import MaterialTable from "material-table";
import TableChartIcon from "@material-ui/icons/TableChart";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "@material-ui/core/Table";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { EqualizerOutlined } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  //Aqui hacemos la confiracion de la grafica 
  var options = {
    high: 10, //Definimos hasta donde llegara y
    responsive: true,
    maintainAspectRatio: false,

    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 0 === 0 ? value : null;
      },
    },
  };
  const classes = useStyles();
  const [euler, setEuler] = useState([]); //Inicilizamos la ecuacion de euler como un objeto 
  const [xinit, setXInit] = useState(0); //Inicilizamos x en 0 dependiendo la funcion
  const [xfin, setXFin] = useState(0); //Inicilizamos hasta donde llegara x en 0 pero se puede cambiar desde el input
  const [yinit, setYInit] = useState(2); //Inicilizamos y en 2 dependiendo la funcion 
  const [h, setH] = useState(0.1); //Inicilizamos h en 0.1 pero se puede cambiar desde el input
  const [dataChart, setDataChart] = useState([]); //Inicializamos una data para posteriormente graficar 
  const [reloadInfo, setReloadInfo] = useState(false); 
  var data = {
    labels: [],
    series: [{ name: "Euler", data: [] }], //Se guarda la data para posteriormente graficar 
  };
  const { labels, series } = data;

  //Estilos
  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    backgroundColor: "#AE71EB",
  };

  const getInformationXInit = (e) => {
    setXInit(e.target.value);
  };

  const getInformationXFin = (e) => {
    setXFin(e.target.value);
  };

  const getInformationYInit = (e) => {
    setYInit(e.target.value);
  };

  const getInformationH = (e) => {
    setH(e.target.value);
  };
 
  //Comenzamos con la declarion de nuestras variables para su uso posterior 
  const getinfos = () => {
    var i = 0; //Iteracciones desde 0
    var j = Number(xinit); // X final 
    var eulerInfo = []; //Data de euler para graficar 
    var counter = 0; // X de puntos a graficar en euler
    var iterations = 0; // Iteracciones + 1
    var euler = 0; // Iniciamos euler en 0 para su uso posterior 
    var newY = Number(yinit); //Y inicial 

    //Definimos algunos valores de h solo para validar y no consumir muchos recursos 
    if (
      h == "0." ||
      h == "0.0" ||
      h == "0.00" ||
      h == "0.000" ||
      h == "0.0000" ||
      h == "0.0000" ||
      h == "1." ||
      h == "2." ||
      h == "3." ||
      h == "." ||
      h == "" ||
      h == "0"
    ) {
      return;
    }
    //Creamos la funcion de for para realizar las iteracciones hasta llegar a X final
    for (j = Number(xinit); j <= Number(xfin); j += Number(h)) {
      iterations++;
    }
    //console.log(iterations);
    //Comienza el ciclo while para realizar euler dependiendo las iteracciones
    while (i <= iterations) {
      eulerInfo[i] = {
        iteration: i + 1,
        x: Number(counter),
        euler: newY,
      };



      //Inicia Calculo de Euler
      //2xy funcion principal
      euler = 2 * Number(counter) * Number(newY); // Aqui solo se puede cambiar la funcion Teniendo en cuenta que counter es 'x' y newY es 'y'
      newY = Number(newY) + Number(h) * Number(euler);
      //Termina Calculo de Euler

      //Guardamos la data de euler para graficar 
      labels.push(counter.toFixed(2));
      series[0].data.push(eulerInfo[i].euler);

      counter += Number(h);
      i++;
    }

    setEuler(eulerInfo);
    setDataChart(data);
  };

  useEffect(() => {
    getinfos();
    setReloadInfo(false);
  }, [xinit, xfin, yinit, h]);


  console.log(euler);
  return (
    //Comienza la vista de la grafica y sus apartados 
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Valor Final X"
            name="xfin"
            id="standard-basic"
            type="numeric"
            defaultValue="0"
            onChange={(e) => getInformationXFin(e)}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Valor De H"
            name="h"
            defaultValue="0.10"
            id="standard-basic"
            onChange={(e) => getInformationH(e)}
            type="numeric"
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Ecuacion: 2xy"
            headerColor="primary"
            tabs={[
              {
                tabName: "Tabla De Iteraciones",
                tabIcon: TableChartIcon,
                tabContent: (
                  <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                      <CardHeader plain color="primary">
                        <h4 className={classes.cardTitleWhite}>
                          Intervalo de la estimación {xinit} a {xfin}
                        </h4>
                        <p className={classes.cardCategoryWhite}>h = {h}</p>
                      </CardHeader>
                      <CardBody>
                        <>
                          <TableContainer>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">
                                    Iteración
                                  </TableCell>
                                  <TableCell align="center">X</TableCell>
                                  <TableCell align="center">Euler</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {!euler.length ? (
                                  <TableRow>
                                    <TableCell align="center" colSpan={6}>
                                      No se encuentran resultados
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  euler.map((euler) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <TableRow>
                                      <TableCell align="center">
                                        {euler.iteration}
                                      </TableCell>
                                      <TableCell align="center">
                                        {euler.x}
                                      </TableCell>
                                      <TableCell align="center">
                                        {euler.euler}
                                      </TableCell>
                                    </TableRow>
                                  ))
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      </CardBody>
                    </Card>
                  </GridItem>
                ),
              },
              {
                tabName: "Grafica",
                tabIcon: BarChartIcon,
                tabContent: (
                  <>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card chart>
                        <CardHeader color="primary">
                          <ChartistGraph
                            style={{
                              height: "600px",
                            }}
                            className="ct-chart"
                            data={dataChart}
                            type="Line"
                            options={options}
                            listener={dailySalesChart.animation}
                          />
                        </CardHeader>
                        <CardBody className="cardCategory">
                          <List style={flexContainer}>
                            <ListItem>
                              <ListItemIcon>
                                <StopIcon style={{ color: "white" }} />
                              </ListItemIcon>
                              <ListItemText primary="Euler" />
                            </ListItem>
                          </List>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
