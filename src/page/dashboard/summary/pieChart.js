import { AddIcon } from '@chakra-ui/icons'
import {
    Box,
    Heading,
} from '@chakra-ui/react'
import React, { useState, useEffect, Component } from 'react'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import App from '../../../App'
import ApexCharts from 'apexcharts'
import ReactApexChart from 'apexcharts'
import { PieChart } from "react-minimal-pie-chart"

import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const mockupData = [
    {
        name: "กระเพรา",
        unit: 234
    },
    {
        name: "ข้าวมันไก้",
        unit: 1234
    },
    {
        name: "ข้าวขาหมู",
        unit: 23
    }
]


export function DashBoardSummaryPage() {
    if (mockupData) {
        return (
            <> 
                {mockupData.map(menu => {
                return <li key={menu.name}>{menu.name} - {menu.unit}</li>
            })}


                <Box w="30%" ml="35%" mt="10%">

                    <PieChart
                        animation
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={[
                            {
                                color: "#"+((1<<24)*Math.random()|0).toString(16),
                                title: "One",
                                value: 10,
                            },
                            {
                                color: "#"+((1<<24)*Math.random()|0).toString(16),
                                title: "Two",
                                value: 90,
                            },
                            {
                                color: "#"+((1<<24)*Math.random()|0).toString(16),
                                title: "Three",
                                value: 40,
                            },
                        ]}
                        labelPosition={50}
                        lengthAngle={360}
                        lineWidth={15}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={0}
                        viewBoxSize={[100, 100]}
                    />
                </Box>




            </>
        )
    }
    return (
        <>
            test summary page
        </>
    )
}
