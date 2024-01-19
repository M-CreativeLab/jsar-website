import { Space } from "antd";

const size = 18;

export function ColorBlock(props: { color: string }) {
  return (
    <Space>
      <div style={{
        width: size,
        height: size,
        backgroundColor: props.color,
        borderRadius: '5px'
      }} />
      <code>{props.color}</code>
    </Space>
  )
}
