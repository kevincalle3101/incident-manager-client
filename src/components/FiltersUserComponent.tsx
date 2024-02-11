import { ButtonGroup, Button } from 'react-bootstrap';
import { useUserIncidenceStore } from '../store/userIncidenceStore';
import { useMediaQuery } from 'react-responsive';

const FiltersComponent = () => {
  const { fetchFilteredIncidences } = useUserIncidenceStore();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  
  const handleFilterChange = async (filter:string) => {
    try {
      await fetchFilteredIncidences(filter);
    } catch (error) {
      console.error('Error fetching filtered incidences:', error);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', borderRadius: '5px' }}>
      <ButtonGroup style={{ marginLeft: isSmallScreen ? '-10px' : '0' }}>
      <Button variant="primary" size={isSmallScreen ? 'sm' : undefined} onClick={() => handleFilterChange('newest')}>Nuevas</Button>
      <Button variant="primary" size={isSmallScreen ? 'sm' : undefined} onClick={() => handleFilterChange('oldest')}>Antiguas</Button>
      <Button variant="primary" size={isSmallScreen ? 'sm' : undefined} onClick={() => handleFilterChange('active')}>Resueltas</Button>
      <Button variant="primary" size={isSmallScreen ? 'sm' : undefined} onClick={() => handleFilterChange('pending')}>Activas</Button>
      <Button variant="primary" size={isSmallScreen ? 'sm' : undefined} onClick={() => handleFilterChange('clear')}>Limpiar</Button>
    </ButtonGroup>
    </div>
  );
};

export default FiltersComponent;