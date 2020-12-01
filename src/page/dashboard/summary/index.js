import React, { useEffect, useState, useParams } from 'react'
import CanvasJSReact from './canvasjs.react'
import { Text, Stack, Icon, Container, Box } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBtc } from '@fortawesome/free-brands-svg-icons'
import bent from 'bent'
import { LoadingAnimation } from '../../../component/loadingAnimation'
const getJSON = bent(process.env.REACT_APP_BACKEND_URL, 'json', 'POST')

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function option(datasOnGraph) {
    return {
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
}

export function DashBoardSummaryPage() {
    async function summaryData(URL, id, accToken) {
        return await getJSON(URL, { lineUid: id }, { authorization: `Bearer ${accToken}` })
    }

    function getSummaryData() {
        const lineUid = localStorage.getItem('lineUid')
        const accToken = localStorage.getItem('lineToken')
        return summaryData('/dashboard/summary', lineUid, accToken).then((data) => {
            return data
        }).catch((err) => {
            console.log(err)
        })
    }

    const [datasOnGraph, setdatasOnGraph] = useState(undefined)
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        let count = 0
        let rawDataGraph = []

        getSummaryData().then((data) => {
            let menu = Object.values(data)
            menu.forEach(elem => {
                count += elem['price']
            })
            setTotalPrice(count)
            rawDataGraph = Object.values(data)
            setdatasOnGraph(rawDataGraph.map(object => {
                return {
                    y: object.unit,
                    label: object.name
                }
            }
            ))
        }
        )

    }, [])

    if (datasOnGraph)
        return (
            <>
                <br></br>
                <CanvasJSChart options={option(datasOnGraph)} mt="10%" />

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
                        <Text>Baht</Text>
                    </Box>

                </Stack>
            </>
        )
    return <LoadingAnimation />
}
