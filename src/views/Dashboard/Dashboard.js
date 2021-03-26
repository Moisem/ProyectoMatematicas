import React, { useEffect, useState } from "react";
import CustomInput from "components/CustomInput/CustomInput.js";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
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
  const classes = useStyles();
  const [euler, setEuler] = useState([]);
  const [rungeKutta, setRungeKutta] = useState([]);
  const [xinit, setXInit] = useState(0);
  const [xfin, setXFin] = useState(0);
  const [yinit, setYInit] = useState(0);
  const [h, setH] = useState(0.1);
  const [dataChart, setDataChart] = useState([]);
  const [reloadInfo, setReloadInfo] = useState(false);
  var data = {
    labels: [],
    series: [[], [], []],
  };
  const { labels, series } = data;

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
    var newY = Number(yinit);
    var newYKutta = Number(yinit);
    var k1 = 0;
    var x2 = 0;
    var y2 = 0;
    var k2 = 0;
    var y3 = 0;
    var k3 = 0;
    var x4 = 0;
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
      k1 = -20 * Number(newYKutta) + 7 ** (-0.5 * Number(counter));
      x2 = Number(counter) + Number(h) / 2;
      y2 = Number(newYKutta) + (k1 * Number(h)) / 2;
      k2 = -20 * y2 + 7 ** (-0.5 * x2);
      y3 = Number(newYKutta) + (k2 * Number(h)) / 2;
      k3 = -20 * y3 + 7 ** (-0.5 * x2);
      x4 = Number(counter) + Number(h);
      y4 = Number(newYKutta) + k3 * Number(h);
      k4 = -20 * y4 + 7 ** (-0.5 * x2);

      rungeKuttaInfo[i] = {
        iteration: i + 1,
        x: Number(counter),
        y: Number(newYKutta),
        k1: k1,
        k2: k2,
        k3: k3,
        k4: k4,
      };

      newYKutta =
        Number(newYKutta) + (Number(h) / 6) * (k1 + 2 * k2 + 2 * k3 + k4);

      eulerInfo[i] = {
        iteration: i + 1,
        x: Number(counter),
        y: Number(newY),
        euler: -20 * Number(newY) + 7 ** (-0.5 * Number(counter)),
        eulerM: Number(counter) - Number(newY) + Number(2),
        k4: k4,
      };
      labels.push(counter.toFixed(2));
      series[0].push(eulerInfo[i].euler);
      series[1].push(Number(eulerInfo[i].eulerM));
      series[2].push(eulerInfo[i].k4);
      newY = Number(newY) + Number(h) * Number(eulerInfo[i].euler);

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
            label="Valor Inicial X"
            name="xinit"
            id="standard-basic"
            type="numeric"
            defaultValue="0"
            onChange={(e) => getInformationXInit(e)}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
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
            label="Valor Inicial Y"
            name="yinit"
            id="standard-basic"
            type="numeric"
            defaultValue="0"
            onChange={(e) => getInformationYInit(e)}
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
            title="Ecuacion: -20y + 7e(0.5-x)"
            headerColor="primary"
            tabs={[
              {
                tabName: "Tabla Runge Kutta",
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
                                  <TableCell align="center">Y</TableCell>
                                  <TableCell align="center">K1</TableCell>
                                  <TableCell align="center">K2</TableCell>
                                  <TableCell align="center">K3</TableCell>
                                  <TableCell align="center">K4</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {!rungeKutta.length ? (
                                  <TableRow>
                                    <TableCell align="center" colSpan={6}>
                                      No se encuentran Cuentas Bancarias
                                      Registradas
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  rungeKutta.map((rungeKutta) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <TableRow>
                                      <TableCell align="center">
                                        {rungeKutta.iteration}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.x}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.y}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.k1}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.k2}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.k3}
                                      </TableCell>
                                      <TableCell align="center">
                                        {rungeKutta.k4}
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
                tabName: "Tabla",
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
                                  <TableCell align="center">Y</TableCell>
                                  <TableCell align="center">Euler</TableCell>
                                  <TableCell align="center">
                                    Euler Mejorado
                                  </TableCell>
                                  <TableCell align="center">RK4</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {!euler.length ? (
                                  <TableRow>
                                    <TableCell align="center" colSpan={6}>
                                      No se encuentran Cuentas Bancarias
                                      Registradas
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
                                        {euler.y}
                                      </TableCell>
                                      <TableCell align="center">
                                        {euler.euler}
                                      </TableCell>
                                      <TableCell align="center">
                                        {euler.eulerM}
                                      </TableCell>
                                      <TableCell align="center">
                                        {euler.k4}
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
                            className="ct-chart"
                            data={dataChart}
                            type="Line"
                            options={dailySalesChart.options}
                            listener={dailySalesChart.animation}
                          />
                        </CardHeader>
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
