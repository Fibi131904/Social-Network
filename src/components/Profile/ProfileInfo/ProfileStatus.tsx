import React, { ChangeEvent, useState } from 'react'


type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {
   
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
    props.updateUserStatus(status)
    }
    const onStatusChange= (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);

    }

    return (
    <div>
        {!editMode &&
            <div >
                <span onDoubleClick={activateEditMode} >{props.status || '---'}</span>
            </div>
        }
        {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
        }
    </div>

    );

}
