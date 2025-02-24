import { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import Table from '../../components/table/table';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { getItems, SupplyChainItem } from '../../api/supplyChainService';
import Button from '../../components/button/button';

const columns: ColumnDef<SupplyChainItem>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Item',
  },
  {
    accessorKey: 'created',
    header: 'Creation Date',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'action',
    header: 'Action',
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<SupplyChainItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getItems();
        items.forEach((item) => (item.action = 'view'));
        setData(items);
      } catch (error) {
        // TODO: Here we can add an spcial library to log the errors.
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto pt-10">
        <div className="flex justify-between items-center py-10">
          <h2>Items List</h2>
          <Button onClick={() => navigate('/add')}>Add</Button>
        </div>
        <Table columns={columns} data={data} />
      </div>
    </Layout>
  );
}

export default HomePage;
