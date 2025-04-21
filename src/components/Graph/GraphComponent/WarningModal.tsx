import { Modal, Button } from "react-bootstrap";
import { ApiGraphData } from "../../../types";

type Props = {
  showWarningModal: boolean;
  handleConfirmLargeGraph: (confirm: boolean) => void;
  pendingGraphData: ApiGraphData | null;
};
export const WarningModal = ({
  showWarningModal,
  handleConfirmLargeGraph,
  pendingGraphData,
}: Props) => {
  return (
    <Modal
      show={showWarningModal}
      onHide={() => handleConfirmLargeGraph(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Предупреждение</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Граф содержит {pendingGraphData?.nodes.length} узлов и{" "}
        {pendingGraphData?.links.length} связей, что может повлиять на
        производительность и вызвать проблемы с отображением. Вы уверены, что
        хотите продолжить?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleConfirmLargeGraph(false)}
        >
          Отмена
        </Button>
        <Button variant="primary" onClick={() => handleConfirmLargeGraph(true)}>
          Продолжить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
