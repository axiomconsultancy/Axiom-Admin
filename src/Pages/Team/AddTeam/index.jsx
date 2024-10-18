import axios from "axios";
import { Container, Divider, Flex, Group, SimpleGrid } from "@mantine/core";
import { useMutation } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import InputMask from "react-input-mask";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";

export const AddTeam = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      teamMemberName: "",
      teamMemberTitle: "",
      teamMemberEmail: "",
      teamMemberImage: null,
      teamMemberPhone: "",
      teamMemberFacebookLink: "facebook.com/",
      teamMemberTwitterLink: "twitter.com/",
      teamMemberLinkedInLink: "linkedin.com/",
      memberPriority: "",
      githubLink: "",
      bankName: "",
      bankBranch: "",
      bankAccountNumber: "",
      IBAN: "",
      IDCardFront: null,
      IDCardBack: null,
      officialEmail: "",
      officialPhone: "",
      CNIC: "",
      kinName: "",
      kinRelation: "",
      kinContact: "",
      kinAddress: "",
    },
    // we will add team member CNIC as well
    validate: {
      teamMemberName: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberTitle: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberEmail: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(val)
          ? null
          : "Please Enter A Valid Email",
      // teamMemberPhone, must be 11 digits and digits only
      officialEmail: (val) =>
        !val || /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(val)
          ? null
          : "Please Enter A Valid Email",
      teamMemberPhone: (val) =>
        /^(\+92|0)?3\d{2}-?\d{7}$/.test(val)
          ? null
          : "Please Enter A Valid Phone Number",
      officialPhone: (val) =>
        !val || /^(\+92|0)?3\d{2}-?\d{7}$/.test(val)
          ? null
          : "Please Enter A Valid Phone Number",
      teamMemberFacebookLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberTwitterLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      teamMemberLinkedInLink: (val) =>
        val.trim().length < 1
          ? "Please Enter Value Of Length Greater Than 0"
          : null,
      memberPriority: (val) => val.length < 1,
      CNIC: (val) =>
        val.length < 1 || val?.length > 15 ? "Please Enter CNIC" : null,
      IDCardFront: (value) => (value ? null : "Please Upload Cnic front image"),
      IDCardBack: (value) => (value ? null : "Please Upload Cnic back image"),
      teamMemberImage: (value) => (value ? null : "Please Upload User photo"),
      bankAccountNumber: (val) =>
        !val || /^[0-9]{8,16}$/.test(val) 
          ? null 
          : "Bank account number must be 8-16 digits",
      IBAN: (val) =>
        !val || /^PK\d{2}[A-Z0-9]{4}\d{16}$/.test(val)
          ? null
          : "Please enter a valid Pakistani IBAN",
      // Making kin fields optional
      kinName: (value) => (!value || value.trim() !== "" ? null : null),
      kinRelation: (value) => (!value || value.trim() !== "" ? null : null),
      kinContact: (value) => (!value || value.trim() !== "" ? null : null),
      kinAddress: (value) => (!value || value.trim() !== "" ? null : null),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
    }
  }, [state]);
  const handleAddTeam = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(
          `${backendUrl + `/api/v1/teamMember/${state?.data?._id}`}`,
          values,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      else
        return axios.post(`${backendUrl + "/api/v1/teamMember"}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewTeams);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader
        label={state?.isUpdate ? "Edit Team Member" : "Add Team Member"}
      />
      <form onSubmit={form.onSubmit((values) => handleAddTeam.mutate(values))}>
        <Divider
          my="xl"
          label="Personal Information"
          labelPosition="center"
          fz={"lg"}
        />
        {/* <Flex gap={"xl"} justify={"space-around"}> */}
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}
        >
          <InputField
            label={"Team Member Name"}
            placeholder={"Enter Name"}
            form={form}
            withAsterisk
            validateName={"teamMemberName"}
          />
          <InputField
            label={"Job Title"}
            placeholder={"Enter Job Title"}
            form={form}
            withAsterisk
            validateName={"teamMemberTitle"}
          />
          <InputField
            label={"Personal Email"}
            placeholder={"Enter Personal Address"}
            form={form}
            withAsterisk
            validateName={"teamMemberEmail"}
          />
          <InputField
            label={"Contact Number"}
            placeholder={"Enter Contact Number"}
            form={form}
            component={InputMask}
            mask={"0399-9999999"}
            withAsterisk
            validateName={"teamMemberPhone"}
          />
          <InputField
            label={"CNIC"}
            placeholder={"CNIC (13 digits)"}
            form={form}
            component={InputMask}
            mask={"99999-9999999-9"}
            withAsterisk
            validateName={"CNIC"}
          />
          <InputField
            label={"Priority"}
            placeholder={"Enter Priority"}
            form={form}
            type="number"
            withAsterisk
            validateName={"memberPriority"}
          />
        </SimpleGrid>
        {/* </Flex> */}
        <Divider
          my="xl"
          label="Contact Information"
          labelPosition="center"
          fz={"lg"}
        />
        <SimpleGrid cols={2}>
          <InputField
            label={"Official Email"}
            placeholder={"Official Email"}
            form={form}
            validateName={"officialEmail"}
          />
          <InputField
            label={"Official Phone"}
            placeholder={"Official Phone"}
            form={form}
            validateName={"officialPhone"}
            component={InputMask}
            mask={"0399-9999999"}
          />
          {/* <InputField
              label={"Contact Number"}
              placeholder={"Enter Contact Number"}
              form={form}
              component={InputMask}
              mask={"0399-9999999"}
              withAsterisk
              validateName={"teamMemberPhone"}
            /> */}
        </SimpleGrid>
        <Divider
          my="xl"
          label="Social Links"
          labelPosition="center"
          fz={"lg"}
        />
        <SimpleGrid cols={2}>
          <InputField
            label={"Facebook Link"}
            placeholder={"www.facebook.com/team-member-profile"}
            form={form}
            validateName={"teamMemberFacebookLink"}
          />
          <InputField
            label={"Twitter Link"}
            placeholder={"www.twitter.com/team-member-profile"}
            form={form}
            validateName={"teamMemberTwitterLink"}
          />
          <InputField
            label={"LinkedIn Link"}
            placeholder={"www.linkedin.com/team-member-profile"}
            form={form}
            validateName={"teamMemberLinkedInLink"}
          />
          <InputField
            label={"Github Link"}
            placeholder={"www.github.com/team-member-profile"}
            form={form}
            validateName={"githubLink"}
          />
        </SimpleGrid>
        <Divider
          my="xl"
          label="Account Information"
          labelPosition="center"
          fz={"lg"}
        />
        <SimpleGrid cols={2}>
          <InputField
            label={"Bank Name"}
            placeholder={"Bank Name"}
            form={form}
            validateName={"bankName"}
          />
          <InputField
            label={"Bank Branch"}
            placeholder={"Bank Branch"}
            form={form}
            validateName={"bankBranch"}
          />
          <InputField
            label={"Bank Account Number"}
            placeholder={"Bank Account Number"}
            form={form}
            validateName={"bankAccountNumber"}
          />
          <InputField
            label={"IBAN"}
            placeholder={"IBAN"}
            form={form}
            validateName={"IBAN"}
          />
        </SimpleGrid>
        <Divider
          my="xl"
          label="Emergency Contact"
          labelPosition="center"
          fz={"lg"}
        />
        <SimpleGrid cols={2}>
          <InputField
            label={"Next Of Kin Name"}
            placeholder={"Next Of Kin Name"}
            form={form}
            validateName={"kinName"}
          />
          <InputField
            label={"Next Of Kin Relation"}
            placeholder={"Next Of Kin Relation"}
            form={form}
            validateName={"kinRelation"}
          />
          <InputField
            label={"Next Of Kin Contact"}
            placeholder={"Next Of Kin Contact"}
            form={form}
            validateName={"kinContact"}
          />
          <InputField
            label={"Address"}
            placeholder={"Address"}
            form={form}
            validateName={"kinAddress"}
          />
        </SimpleGrid>

        <Divider
          my="xl"
          label="ID Card Information"
          labelPosition="center"
          fz={"lg"}
        />

        <Group position="center">
          <DropZone
            form={form}
            folderName={"teamMember"}
            name={"teamMemberImage"}
            label="Team Member Image"
          />
          <DropZone
            form={form}
            folderName={"teamMember"}
            name={"IDCardFront"}
            label="ID Card Front Image"
          />
          <DropZone
            form={form}
            folderName={"teamMember"}
            name={"IDCardBack"}
            label="ID Card Back Image"
          />
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewTeams)}
          />
          <Button
            label={state?.isUpdate ? "Edit Team Member" : "Add Team Member"}
            type={"submit"}
            loading={handleAddTeam.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
