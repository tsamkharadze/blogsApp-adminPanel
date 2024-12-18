import { createNewUser } from "../../../../supabase/users/get-users";
import UserForm from "../../../reusable-components/edit-update-form";

const CreateUser = () => {
  const handleAddUser = (values: { email: string; phone: string }) => {
    console.log("Adding user:", values);
    createNewUser(values);
  };

  return (
    <div>
      <h2>Add User</h2>
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default CreateUser;
