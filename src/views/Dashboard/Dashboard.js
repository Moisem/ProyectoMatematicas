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
  const [iterations, setIterations] = useState(0);
  const [h, setH] = useState(0);
  const [dataChart, setDataChart] = useState([]);
  const [reloadInfo, setReloadInfo] = useState(false);
  var data = {
    labels: [],
    series: [[], [], []],
  };
  const { labels, series } = data;

  const getInformationIteration = (e) => {
    setIterations(e.target.value);
  };

  const getInformationH = (e) => {
    setH(e.target.value);
  };

  const getinfos = () => {
    var i = 0;
    var eulerInfo = [];
    var counter = 0;
    for (i = 0; i <= iterations; i++) {
      counter += Number(h);
      eulerInfo[i] = {
        iteration: i,
        h: counter,
        euler: i * counter,
        eulerM: i + counter,
        k4: i / counter,
      };
      labels.push(i);
      series[0].push(eulerInfo[i].euler);
      series[1].push(eulerInfo[i].eulerM);
      series[2].push(eulerInfo[i].k4);
    }

    setEuler(eulerInfo);
    setDataChart(data);
  };

  useEffect(() => {
    getinfos();
    setReloadInfo(false);
  }, [iterations, h]);

  console.log(euler);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Numero De Iteraciones"
            name="iterations"
            id="standard-basic"
            type="numeric"
            defaultValue="0"
            onChange={(e) => getInformationIteration(e)}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <TextField
            label="Valor De H"
            name="h"
            defaultValue="0"
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
            title="Ecuación:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Tabla",
                tabIcon: TableChartIcon,
                tabContent: (
                  <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                      <CardHeader plain color="primary">
                        <h4 className={classes.cardTitleWhite}>
                          Intervalo de la estimación 0 a {h}
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
                                        {euler.h}
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
