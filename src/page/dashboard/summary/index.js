import React, { useEffect, useState } from 'react'
import CanvasJSReact from './canvasjs.react'
import { Text, Stack, Icon, Container, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBtc } from '@fortawesome/free-brands-svg-icons'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const mockupData = [
    {
        name: "กระเพรา",
        unit: 50,
        totalPrice: 201023
    },
    {
        name: "ข้าวมันไก้",
        unit: 100,
        totalPrice: 100231
    },
    {
        name: "ข้าวขาหมู",
        unit: 150,
        totalPrice: 10000
    },
    {
        name: "พีพี",
        unit: 500,
        totalPrice: 1000000
    }
]


const datasOnGraph = mockupData.map(object => {
    return {
        y: object.unit,
        label: object.name
    }
})

console.log(datasOnGraph)

const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
        text: "summary today's order"
    },
    data: [{
        type: "pie",
        indexLabel: "{label}: {y} จาน   ",
        startAngle: -90,
        dataPoints: datasOnGraph
    }]
}



export function DashBoardSummaryPage() {
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let count = 0
        mockupData.forEach(element =>
            // console.log(element.totalPrice),
            // console.log(totalPriceToday),
            count += element.totalPrice);
        setTotalPrice(count)

    }, [])
    return (
        <>


            <br></br>
            <CanvasJSChart options={options} mt="10%" />

            <br></br>
            <Stack spacing={4} direction="row" align="center" ml="10%" >
                <Box>
                    <Text>Total Price Today</Text>
                </Box>
                <FontAwesomeIcon icon={faBtc} color="green" size="2x" />
                <Box>

                    {totalPrice}
                </Box>
                <Box>
                    <Text>Bath</Text>
                </Box>

            </Stack>


        </>
    )
}
