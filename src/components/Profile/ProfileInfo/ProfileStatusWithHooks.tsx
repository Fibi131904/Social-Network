import React, { ChangeEvent, useEffect, useState } from 'react'
import {Input} from 'antd';

type ProfileStatusType = {
    status: string
    updateUserStatus: (status: string) => void
}

export const ProfileStatusWithHooks = (props: ProfileStatusType) => {
   
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])

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
              <b>Status:</b>  <span onDoubleClick={activateEditMode} >{props.status || '---'}</span>
            </div>
        }
        {editMode &&
            <div>
                <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
        }
    </div>

    );

}
