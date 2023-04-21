import { EditOutlined, EllipsisOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, IssuesCloseOutlined, StopOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { Meta } = Card

const showStatus = status => {
  status = parseInt(status)
  if (status === 0)
    return (
      <div>
        <ClockCircleOutlined style={{ fontSize: '30px', color: '#08c' }} />
        <span>Pending</span>
      </div>
    )
  if (status === 1)
    return (
      <div>
        <StopOutlined style={{ fontSize: '30px', color: '#08c' }} />
        <span>Rejected</span>
      </div>
    )
  if (status === 2)
    return (
      <div>
        <PlayCircleOutlined style={{ fontSize: '30px', color: '#08c' }} />
        <span>Accepted</span>
      </div>
    )
  if (status === 3)
    return (
      <div>
        <IssuesCloseOutlined style={{ fontSize: '30px', color: '#08c' }} />
        <span>More detail required</span>
      </div>
    )
  if (status === 4)
    return (
      <div>
        <CheckCircleOutlined style={{ fontSize: '30px', color: '#08c' }} />
        <span>Done</span>
      </div>
    )
}
const RequestCard = ({ props }) => (
  <Link to={`/detail/${props.id}`}>
    <Card
      style={{
        width: 300,
      }}>
      <div>
        {/* show different icon according to the status */}
        {showStatus(props.status)}
      </div>
      <Meta title={props.serviceprovider} description={props.detail} />
    </Card>
  </Link>
)
export default RequestCard
