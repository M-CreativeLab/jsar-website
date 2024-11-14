import { useState, useEffect } from 'react'
import { CopyOutlined, CheckOutlined } from '@ant-design/icons'

type Props = {
  codeToCopy: string,
  buttonStyle?: React.CSSProperties,
}

export default function CodeCopyButton(props: Props) {
  const [copied, setCopied] = useState(false);
  let timerToResetCopied;

  useEffect(() => {
    return () => {
      clearTimeout(timerToResetCopied);
    }
  }, []);

  return (
    <div
      className="code-copy-button"
      style={{
        cursor: 'pointer',
        ...props?.buttonStyle,
      }}
      onClick={() => {
        navigator.clipboard.writeText(props.codeToCopy);
        setCopied(true);
        timerToResetCopied = setTimeout(() => setCopied(false), 3000);
      }}
    >
      {copied ?
        <CheckOutlined style={{ color: '#52c41a', fontWeight: 'bold' }} /> :
        <CopyOutlined style={{ color: '#757575' }} />}
    </div>
  )
}
