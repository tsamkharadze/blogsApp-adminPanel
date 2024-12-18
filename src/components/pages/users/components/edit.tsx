import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getSingleUserAsAdmin,
  editUserAsAdmin,
} from "../../../../supabase/users/get-users";
import UserForm from "../../../reusable-components/edit-update-form";

const EditUser = () => {
  const { id } = useParams();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["singleUserForEdit", id],
    queryFn: () => {
      if (!id) throw new Error("User ID is missing");
      return getSingleUserAsAdmin(id);
    },
  });

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
