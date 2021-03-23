import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import BarChartIcon from '@material-ui/icons/BarChart';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import TableChartIcon from '@material-ui/icons/TableChart';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
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
                          Intervalo de la estimación 0 a 2
                        </h4>
                        <p className={classes.cardCategoryWhite}>
                          h = 0.1
                        </p>
                      </CardHeader>
                      <CardBody>
                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Iteración", "h", "Euler", "Euler Mejorado", "RK4"]}
                          tableData={[
                            ["0", "0", "1", "1", "1"],
                            ["1", "0.1", "1.1", "1.10794", "1.10794"],
                            ["2", "0.2", "1.21588", "1.23317", "1.23317"],
                            ["3", "0.3", "1.35047", "1.37883", "1.38068"],
                            ["4", "0.4", "1.50719", "1.54872", "1.55309"],
                            ["5", "0.5", "1.69024", "1.7475", "1.75609"],
                            ["6", "0.6", "1.90477", "1.98092", "1.99611"],
                            ["7", "0.7", "2.15706", "2.256", "2.28117"],
                            ["8", "0.8", "2.45493", "2.58147", "2.62128"],
                            ["9", "0.9", "2.80801", "2.96815", "3.02909"],
                            ["10", "1", "3.2283", "3.42955", "3.52058"],
                            ["11", "1.1", "3.7308", "3.98257", "4.11609"],
                            ["12", "1.2", "4.33434", "4.6485", "4.84167"],
                            ["13", "1.3", "5.06265", "5.45423", "5.73079"],
                            ["14", "1.4", "5.9458", "6.43393", "6.82683"],
                            ["15", "1.5", "7.02206", "7.63121", "8.18626"],
                            ["16", "1.6", "8.34036", "9.10198", "9.88304"],
                            ["17", "1.7", "9.96361", "10.91834", "12.01473"],
                            ["18", "1.8", "11.97307", "13.17366", "14.71073"],
                            ["19", "1.9", "14.47425", "15.98953", "18.1439"],
                            ["20", "2", "17.60481", "19.52508", "22.54661"],
                          ]}
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                )
              },
              {
                tabName: "Grafica",
                tabIcon: BarChartIcon,
                tabContent: (
                  <>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card chart>
                      <CardHeader color="success">
                        <ChartistGraph
                          className="ct-chart"
                          data={dailySalesChart.data}
                          type="Line"
                          options={dailySalesChart.options}
                          listener={dailySalesChart.animation}
                        />
                      </CardHeader>
                    </Card>
                  </GridItem>
                  </>
                )
              },
              { /*
                tabName: "Solucion Análitica",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              */}
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
