
import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash, faComment } from '@fortawesome/free-solid-svg-icons';
import { useAdminIncidenceStore } from '../../store/adminIncidenceStore';
import { useShallow } from 'zustand/react/shallow'
import dayjs from 'dayjs';
import ModalDescription from '../../components/ModalDescription';
import ModalImage from '../../components/ModalImage';
import ModalChangeState from '../../components/ModalChangeState';
import ModalDeleteIncidence from '../../components/ModalDeleteIncidence';
import FiltersComponent from '../../components/FiltersComponent';
import CreateAdminComment from '../../components/CreateAdminComment';
import AdminModalViewComments from '../../components/AdminModalViewComments'

function AdminHome() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showChangeStateModal, setShowChangeStateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedIncidenceId, setSelectedIncidenceId] = useState<number>(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteIncidenceId, setSelectedDeleteIncidenceId] = useState<number>(0);
  const [showModalCreateComment, setShowModalCreateComment] = useState(false);
  const [selectedIncidenceIdToCreate, setSelectedIncidenceIdToCreate] = useState(0);
  const [showModalViewComments, setShowModalViewComments] = useState(false);
  const [selectedIncidenceIdViewComments, setSelectedIncidenceIdViewComments] = useState(0);

  const handleModalCreateComment = (id: number) => {
    setSelectedIncidenceIdToCreate(id);
    setShowModalCreateComment(true);
  }
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
  const handleEdit = (id: number) => {
    setSelectedIncidenceId(id);
    setShowChangeStateModal(true);
  };
  const handleDelete = (id: number) => {
    setSelectedDeleteIncidenceId(id);
    setShowDeleteModal(true);
  }
  const allIncidences = useAdminIncidenceStore(useShallow((state) => state.allIncidences));

  const { fetchIncidences } = useAdminIncidenceStore();
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
            <h2 className='text-primary fs-1 fw-bold'>Todas las Incidencias</h2>
          </div>
          <div className="col-lg-8 mt-3 d-lg-flex justify-content-end">
            <FiltersComponent />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Locación</th>
                <th>Descripción</th>
                <th>Comentarios</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {allIncidences && allIncidences.map(incidence => (
                <tr key={incidence.id}>
                  <td>{dayjs(incidence.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{incidence.User.name}</td>
                  <td>{incidence.subject}</td>
                  <td>{incidence.type}</td>
                  <td className={incidence.isResolved ? 'text-success' : ''}>{incidence.isResolved ? 'Resuelto' : 'Pendiente'}</td>
                  <td>{incidence.location}</td>
                  <td >
                    <Button variant="link" onClick={() => handleShow(incidence.description)}>Ver descripción</Button>
                  </td>
                  <td>
                    <Button variant="link" className="ms-0" title="Comentarios" onClick={() => { handleModalViewComments(incidence.id) }}>
                      Ver <FontAwesomeIcon icon={faEye} className="ms-2" />
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" className="mx-1" rel="noopener noreferrer"
                      title="Ver Imagen" onClick={() => handleShowImageModal(incidence.image_secure_url)}>
                      Ver<FontAwesomeIcon icon={faEye} className="ms-2" />
                    </Button>
                  </td>
                  <td>
                    <Button variant="link" className="mx-2" title="Editar" onClick={() => { handleEdit(incidence.id) }} disabled={incidence.isResolved}>
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="link" className="mx-2" title="Eliminar" style={{ color: "red" }} onClick={() => { handleDelete(incidence.id) }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button variant="link" className="ms-0" title="Comentar" onClick={() => { handleModalCreateComment(incidence.id) }}>
                      <FontAwesomeIcon icon={faComment} className="ms-2" />
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
      <ModalChangeState show={showChangeStateModal} handleClose={() => setShowChangeStateModal(false)} incidenceId={selectedIncidenceId} />
      <ModalDeleteIncidence show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} incidenceId={selectedDeleteIncidenceId} />
      <CreateAdminComment id={selectedIncidenceIdToCreate} handleClose={() => setShowModalCreateComment(false)} show={showModalCreateComment} />
      <AdminModalViewComments incidenceId={selectedIncidenceIdViewComments} handleClose={() => setShowModalViewComments(false)} show={showModalViewComments} />
    </Container>
  );
}

export default AdminHome;