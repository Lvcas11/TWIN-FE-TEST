import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { getItemById, updateItem } from '../../api/supplyChainService';

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    price: 0,
    user: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!id) return;
        const item = await getItemById(id);
        setFormData({
          name: item.name,
          color: item.color,
          price: item.price,
          user: item.user,
        });
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Failed to fetch item. Please try again.');
      }
    };

    fetchItem();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateItem(id!, {
        name: formData.name,
        color: formData.color,
        price: formData.price,
        user: formData.user,
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Edit Item
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white dark:bg-gray-800"
        >
          <Input
            label="Name"
            id="name-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            data-testid="name-input"
            aria-describedby="name-error"
          />
          <Input
            label="Color"
            id="color-input"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
            data-testid="color-input"
            aria-describedby="color-error"
          />
          <Input
            label="Price"
            id="price-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            data-testid="price-input"
            aria-describedby="price-error"
          />
          <Input
            label="User"
            id="user-input"
            type="text"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            required
            data-testid="user-input"
            aria-describedby="user-error"
          />
          {error && (
            <p
              id="form-error"
              className="text-red-500 mb-4 dark:text-red-400"
              data-testid="form-error"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              aria-disabled={loading}
              data-testid="submit-button"
            >
              {loading ? 'Updating...' : 'Update Item'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default EditPage;
