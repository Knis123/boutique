import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavigateProduct = ({ productId, children }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <Button onClick={handleProductClick} style={{ cursor: 'pointer' }} variant="link" w="full" p={0}>
      {children}
    </Button>
  );
};

export default NavigateProduct;
