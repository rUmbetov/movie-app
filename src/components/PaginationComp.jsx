import { Pagination } from 'antd';

export default function PaginationControl({ current, totalPages, onChange }) {
  return (
    <Pagination
      onChange={onChange}
      current={current}
      defaultCurrent={1}
      total={totalPages * 10}
      style={{ padding: 30 }}
    />
  );
}