import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import ProductItemEditor from './ProductItemEditor';

export default function ProductsEditor({ content, setContent, onError, onUploadNotice }) {
  const products = content?.products || [];

  const updateProductAt = (index, updated) => {
    const newProducts = [...products];
    newProducts[index] = updated;
    setContent({ ...content, products: newProducts });
  };

  const removeProductAt = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setContent({ ...content, products: newProducts });
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    const newProducts = [...products];
    [newProducts[index], newProducts[index - 1]] = [newProducts[index - 1], newProducts[index]];
    setContent({ ...content, products: newProducts });
  };

  const moveDown = (index) => {
    if (index >= products.length - 1) return;
    const newProducts = [...products];
    [newProducts[index], newProducts[index + 1]] = [newProducts[index + 1], newProducts[index]];
    setContent({ ...content, products: newProducts });
  };

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: '',
      description: '',
      image: '',
      price: ''
    };
    setContent({ ...content, products: [...products, newProduct] });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Products Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>Products</Typography>
          {products?.[0] && (
            <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                Preview (showing first product):
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    height: 160,
                    backgroundImage: `url(${products[0].image})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                    border: '1px solid rgba(0,0,0,0.1)'
                  }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{products[0].name || 'No name'}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{products[0].description || 'No description'}</Typography>
                  <Typography variant="subtitle1" color="secondary">{products[0].price || ''}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {products.map((product, index) => (
            <Paper key={product.id || index} sx={{ p: 2, mb: 2, border: '1px solid rgba(0, 95, 115, 0.2)' }}>
              <ProductItemEditor
                product={product}
                index={index}
                onChange={(updated) => updateProductAt(index, updated)}
                onRemove={() => removeProductAt(index)}
                onMoveUp={() => moveUp(index)}
                onMoveDown={() => moveDown(index)}
                isFirst={index === 0}
                isLast={index === products.length - 1}
                onUploadNotice={onUploadNotice}
                onError={onError}
              />
            </Paper>
          ))}
          <Button variant="outlined" onClick={addProduct} sx={{ mt: 1 }}>
            Add New Product
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


