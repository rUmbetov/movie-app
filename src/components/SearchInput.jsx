import { Input } from 'antd';

export default function SearchInput({ value, onChange }) {
  return <Input className="inputSearch" onChange={onChange} value={value} placeholder="Введите название фильма" />;
}
