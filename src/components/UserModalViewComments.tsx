import { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUserIncidenceStore } from '../store/userIncidenceStore';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';

interface Props {
    show: boolean;
    handleClose: () => void;
    incidenceId: number;
}
const UserModalViewComments: React.FC<Props> = ({ show, handleClose, incidenceId }) => {
    const { fetchCommentsByIncidenceId } = useUserIncidenceStore();
    const allComments = useUserIncidenceStore(useShallow((state) => state.Comments));
    console.log("allComments", allComments);

    useEffect(() => {
        fetchCommentsByIncidenceId(incidenceId);
    }, [fetchCommentsByIncidenceId, incidenceId]);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Comentarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {allComments.length > 0 ? (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {allComments.map((comment, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '10px', width: '100%' }}>
                                    <p style={{ margin: '0' }}>{comment.content}</p>
                                    <div style={{ fontSize: '12px', color: '#999', textAlign: 'right' }}>
                                        <span>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</span>
                                        <span style={{ marginLeft: '2px' }}>{comment.User.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aún no hay comentarios</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModalViewComments;