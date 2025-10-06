import React, { useState } from 'react'
import styles from './properties-icon-wrapper.module.scss'
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDeleteProperty, useEditProperty } from '../../../../hooks/properties';
import PropertyModal from '../../../modals/property/property-modal.component';
import { propertyType } from '../../../constants';

const PropertiesIconWrapper = ({data}) => {
  const { isPending: isPropertyEditing, mutate: editProperty } = useEditProperty();
  const {isPending: isPropertyDeleting, mutate: deleteProperty} = useDeleteProperty();
	const [show, setShow] = useState(false);

  const handleEdit = () => {
    setShow(true)
  }

  const handleDelete = () => {
    !isPropertyDeleting && deleteProperty(data?.id);
  }

  const handleShowClose = () => {
		setShow(false);
  };

  const editFormData = {
    id: data?.id,
    name: data?.name,
    address: data?.address,
    propertyType: data?.propertyType
  }

  return (
		<div className={styles.iconsWrapper}>
			{show && (
				<PropertyModal
					handleAction={!isPropertyEditing && editProperty}
					handleClose={handleShowClose}
					formData={editFormData}
          isEdit={true}
				/>
			)}
			<div className={styles.icon}>
				<TbEdit color="#FF8300" onClick={handleEdit} />
			</div>
			<div className={styles.icon}>
				<RiDeleteBin5Line color="#F12525" onClick={handleDelete} />
			</div>
		</div>
  );
}

export default React.memo(PropertiesIconWrapper)