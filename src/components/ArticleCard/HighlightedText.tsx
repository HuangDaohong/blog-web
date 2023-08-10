import React from 'react';

interface IHighlightedTextProps {
  title: string;
  searchKeyword: string;
  color?: string;
}

const HighlightedText: React.FC<IHighlightedTextProps> = ({ title, searchKeyword, color }) => {
  const highlightStyle: React.CSSProperties = {
    color: color || 'red'
    // textShadow: `0 0 3px ${color || 'red'}`
  };

  if (!searchKeyword) {
    // 如果搜索关键字为空，则直接显示原始标题
    return <span>{title}</span>;
  }

  // 使用正则表达式全局匹配搜索关键字，并将匹配的部分用高亮样式包裹
  const regex = new RegExp(`(${searchKeyword})`, 'gi');
  const parts = title.split(regex);
  console.log(regex, parts);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} style={highlightStyle}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default HighlightedText;
