import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer( function Success() {
   const {modalStore} = useStore()
  return (
    <><div>Your request succesfully saved</div>
    <Button content='Close' onClick={()=>modalStore.closeModal()}/>
    </>
  )
})
