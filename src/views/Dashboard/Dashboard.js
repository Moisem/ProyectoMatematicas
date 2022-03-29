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
  var options = {
    high: 100,
    responsive: true,
    maintainAspectRatio: false,

    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 1 === 0 ? value : null;
      },
    },
  };
  const classes = useStyles();
  const [euler, setEuler] = useState([]);
  const [rungeKutta, setRungeKutta] = useState([]);
  const [xinit, setXInit] = useState(0);
  const [xfin, setXFin] = useState(0);
  const [yinit, setYInit] = useState(2);
  const [h, setH] = useState(0.1);
  const [dataChart, setDataChart] = useState([]);
  const [reloadInfo, setReloadInfo] = useState(false);
  var data = {
    labels: [],
    series: [{ name: "Euler", data: [] }],
  };
  const { labels, series } = data;

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

  const getinfos = () => {
    var i = 0;
    var j = Number(xinit);
    var eulerInfo = [];
    var rungeKuttaInfo = [];
    var counter = 0;
    var iterations = 0;
    var euler = 0;
    var newY = Number(yinit);
    var newYKutta = Number(yinit);
    var Yn = Number(yinit);
    var SubYn = 0;
    var eulerM = 0;
    var k1 = 0;
    var y2 = 0;
    var k2 = 0;
    var y3 = 0;
    var k3 = 0;
    var y4 = 0;
    var k4 = 0;
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
    for (j = Number(xinit); j <= Number(xfin); j += Number(h)) {
      iterations++;
    }
    //console.log(iterations);
    while (i <= iterations) {
      //Inician calculos de Runge Kutta
      eulerInfo[i] = {
        iteration: i + 1,
        x: Number(counter),
        euler: newY,
        eulerM: Yn,
        k4: newYKutta,
      };

      k1 = Math.exp(-newYKutta);
      y2 = Number(newYKutta) + (k1 * h) / 2;
      k2 = Math.exp(-y2);
      y3 = Number(newYKutta) + (k2 * h) / 2;
      k3 = Math.exp(-y3);
      y4 = Number(newYKutta) + k3 * Number(h);
      k4 = Math.exp(-y4);

      rungeKuttaInfo[i] = {
        iteration: i + 1,
        x: Number(counter),
        k1: k1,
        k2: k2,
        k3: k3,
        k4: k4,
      };
      console.log(k1);

      newYKutta =
        Number(newYKutta) + (Number(h) / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      //Termina Runge Kutta

      //Inician Calculos de Euler Mejorado
      SubYn = Yn + Number(h) * Math.exp(-Number(Yn));
      //console.log(SubYn);
      let exp = Math.exp(-Yn);
      let subExp = Math.exp(-SubYn);
      let newH = Number(h) / 2;

      eulerM = Yn + newH * (exp + subExp);
      Yn = eulerM;
      //Terminan calculos de Euler Mejorado

      //Inicia Calculo de Euler
      euler = 2 * Number(counter) * Number(newY);
      newY = Number(newY) + Number(h) * Number(euler);
      //Termina Calculo de Euler

      labels.push(counter.toFixed(2));
      series[0].data.push(eulerInfo[i].euler);

      counter += Number(h);
      i++;
    }

    setEuler(eulerInfo);
    setRungeKutta(rungeKuttaInfo);
    setDataChart(data);
  };

  useEffect(() => {
    getinfos();
    setReloadInfo(false);
  }, [xinit, xfin, yinit, h]);

  console.log(euler);
  return (
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
            title="Ecuacion: y'=exp(-y)"
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
              {
                /*
                tabName: "Solucion Análitica",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              */
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
