
import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faComment } from '@fortawesome/free-solid-svg-icons';
import { useUserIncidenceStore } from '../../store/userIncidenceStore';
import { useShallow } from 'zustand/react/shallow'
import dayjs from 'dayjs';
import ModalDescription from '../../components/ModalDescription';
import ModalImage from '../../components/ModalImage';
import FiltersUserComponent from '../../components/FiltersUserComponent';
import CreateUserComment from '../../components/CreateUserComment';
import UserModalViewComments from '../../components/UserModalViewComments';

function ResidentHome() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModalCreateComment, setShowModalCreateComment] = useState(false);
  const [selectedIncidenceId, setSelectedIncidenceId] = useState(0);
  const [showModalViewComments, setShowModalViewComments] = useState(false);
  const [selectedIncidenceIdViewComments, setSelectedIncidenceIdViewComments] = useState(0);
  const handleModalViewComments = (id: number) => {
    setSelectedIncidenceIdViewComments(id);
    setShowModalViewComments(true);
  }
  const handleShow = (description: string) => {
    setSelectedDescription(description);
    setShowModal(true);
  };
  const handleShowImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };
  const handleModalCreateComment = (id: number) => {
    setSelectedIncidenceId(id);
    setShowModalCreateComment(true);
  }
  const allIncidences = useUserIncidenceStore(useShallow((state) => state.allIncidences));

  const { fetchIncidences } = useUserIncidenceStore();
  useEffect(() => {
    const fetchData = async () => {
      await fetchIncidences();
    };
    fetchData();
  }, []);
  return (
    <Container>
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-lg-4 mt-3 mb-3">
            <h2 className='text-primary fs-1 fw-bold'>Tus Incidencias</h2>
          </div>
          <div className="col-lg-8 mt-3 d-lg-flex justify-content-end">
            <FiltersUserComponent />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Locación</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Comentarios</th>
                <th>Comentar</th>
              </tr>
            </thead>
            <tbody>
              {allIncidences && allIncidences.map(incidence => (
                <tr key={incidence.id}>
                  <td>{dayjs(incidence.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{incidence.subject}</td>
                  <td>{incidence.type}</td>
                  <td className={incidence.isResolved ? 'text-success' : ''}>{incidence.isResolved ? 'Resuelto' : 'Pendiente'}</td>
                  <td>{incidence.location}</td>
                  <td >
                    <Button variant="link" onClick={() => handleShow(incidence.description)}>Ver descripción</Button>
                  </td>
                  <td>
                    <Button variant="link"  rel="noopener noreferrer" className="ms-0"
                      title="Ver Imagen" onClick={() => handleShowImageModal(incidence.image_secure_url)}>
                      Ver<FontAwesomeIcon icon={faEye} className="ms-2" />
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" className="ms-0" title="Comentarios" onClick={() => { handleModalViewComments(incidence.id) }}>
                     Ver <FontAwesomeIcon icon={faEye} className="ms-2" />
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" className="ms-0" title="Comentar" onClick={() => { handleModalCreateComment(incidence.id) }}>
                      Comentar<FontAwesomeIcon icon={faComment} className="ms-2"/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalDescription description={selectedDescription} handleClose={() => setShowModal(false)} show={showModal} />
      <ModalImage imageUrl={selectedImage} handleClose={() => setShowImageModal(false)} show={showImageModal} />
      <CreateUserComment id={selectedIncidenceId} handleClose={() => setShowModalCreateComment(false)} show={showModalCreateComment} />
      <UserModalViewComments incidenceId={selectedIncidenceIdViewComments} handleClose={() => setShowModalViewComments(false)} show={showModalViewComments} />
    </Container>
  );
}

export default ResidentHome;