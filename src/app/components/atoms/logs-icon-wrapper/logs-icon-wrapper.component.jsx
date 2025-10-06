import React, { useState } from 'react'
import styles from './logs-icon-wrapper.module.scss'
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin5Line, RiErrorWarningLine } from 'react-icons/ri';
import PropertyModal from '../../../modals/property/property-modal.component';
import { useDeleteLog, useEditLog } from '../../../../hooks/activity-log';

const LogsIconWrapper = ({data}) => {
  const { isPending: isLogEditing, mutate: editLog } = useEditLog();
  const { isPending: isLogDeleting, mutate: deleteLog } =
		useDeleteLog();
	const [show, setShow] = useState(false);

  const handleShowLog = () => {

  }

  const handleEdit = () => {
    setShow(true)
  }

  const handleDelete = () => {
    !isLogDeleting && deleteLog(data?.id);
  }

  const handleShowClose = () => {
		setShow(false);
  };

  const editFormData = {
    id: data?.id,
    name: data?.name,
    address: data?.address
  }

  return (
		<div className={styles.iconsWrapper}>
			{show && (
				<PropertyModal
					handleAction={!isLogEditing && editLog}
					handleClose={handleShowClose}
					formData={editFormData}
					RiErrorWarningLine
					color="#003889"
				/>
			)}
			<div className={styles.icon}>
				<RiErrorWarningLine color="#003889" onClick={handleShowLog} />
			</div>
			<div className={styles.icon}>
				<TbEdit color="#FF8300" onClick={handleEdit} />
			</div>
			<div className={styles.icon}>
				<RiDeleteBin5Line color="#F12525" onClick={handleDelete} />
			</div>
		</div>
  );
}

export default React.memo(LogsIconWrapper);