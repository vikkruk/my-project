import { PersonData } from '../types';
import ApiService from './api-service';

const addPersonData = async ({
  name, surname, img, gender,
}: PersonData, personRole: 'people'): Promise<void> => {
  try {
    await ApiService.post(`/${personRole}`, {
      name, surname, img, gender,
    });
  } catch (error) {
    throw new Error('Problems with server');
  }
};

const AdminAddDataService = {
  addPersonData,
};

export default AdminAddDataService;
