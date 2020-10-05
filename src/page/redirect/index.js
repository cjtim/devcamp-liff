import { useParams } from 'react-router-dom'

function redirect() {
  let { orderid } = useParams()
  document.location.href = 'scbeasysim://purchase/' + orderid
  return 'scbeasysim://purchase/' + orderid
}
export default redirect
