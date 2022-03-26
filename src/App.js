import React, { useState, memo, useCallback } from 'react';
import './style.css';

const Item = memo((props) => {
  const { idx, content, delHandeler } = props;
  console.log('render!');
  return (
    <li>
      {content}
      <button
        onClick={() => {
          delHandeler(idx);
        }}
      >
        Delete
      </button>
    </li>
  );
});

export default function App() {
  const [val, setVal] = useState('');
  const [list, setList] = useState(['read', 'me', 'please']);
  const addHandeler = () => {
    list.push(val);
    setList([...list]);
    setVal('');
  };
  const delHandeler = useCallback(
    (idx) => {
      list.splice(idx, 1);
      setList([...list]);
    },
    [setList, list]
  );

  return (
    <div>
      <h3>Todo List Demo</h3>
      <input type="text" value={val} onChange={(e) => setVal(e.target.value)} />
      <button
        onClick={() => {
          addHandeler();
        }}
      >
        Add
      </button>
      <ul>
        {list.map((elem, i) => {
          return (
            <Item key={i} idx={i} content={elem} delHandeler={delHandeler} />
          );
        })}
      </ul>
    </div>
  );
}
