import { useParams } from "react-router-dom";
import { editUserAsAdmin } from "../../../../supabase/users/get-users";
import UserForm from "../../../reusable-components/edit-update-form";
import { useGetSingleUserAsAdmin } from "../../../../react-query/query/users/users-query";

const EditUser = () => {
  const { id } = useParams();

  const { data: userData, isLoading } = useGetSingleUserAsAdmin(id);

  if (isLoading) return <div>Loading...</div>;

  const handleEditUser = (values: { email: string; phone: string }) => {
    if (id) {
      editUserAsAdmin(id, values);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <UserForm
        initialValues={{
          email: userData?.email || "",
          phone: userData?.phone || "",
        }}
        onSubmit={handleEditUser}
      />
    </div>
  );
};

export default EditUser;
