export interface Props {
  lastUpdate: any
  light: any
}

const Clock = ({ lastUpdate, light }: Props) => {
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82fa58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }
        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  )
}

const format = (time: Date) => time.toJSON().slice(11, 19) // cut off except hh:mm:ss

export default Clock
