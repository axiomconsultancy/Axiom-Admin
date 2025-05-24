/* eslint-disable no-unused-vars */
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
import { parsePhoneNumberFromString } from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValid as isValidIBAN } from "iban";

export const AddTeam = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();

  const validatePhoneNumber = (val) => {
    if (!val) return "Please enter a phone number";

    // Ensure the number starts with "+" for correct international parsing
    const formattedVal = val.startsWith("+") ? val : `+${val}`;

    // Parse the phone number
    const phoneNumber = parsePhoneNumberFromString(formattedVal);

    return phoneNumber && phoneNumber.isValid() ? null : "Please enter a valid phone number";
  };

  const validateIBAN = (val) => {
    if (!val) return "Please enter an IBAN";

    return isValidIBAN(val) ? null : "Please enter a valid IBAN";
  };

  const validateCNIC = (val) => {
    if (!val) return "Please enter CNIC";

    const cnicPatterns = [
      // South Asia
      /^\d{5}-\d{7}-\d$/, // Pakistan (12345-1234567-1)
      /^\d{12}$/, // India (123412341234 - Aadhaar)
      /^\d{17}$/, // Bangladesh (12345678901234567 - NID)

      // North America
      /^\d{3}-\d{2}-\d{4}$/, // USA (123-45-6789 - SSN)
      /^\d{3}-\d{3}-\d{3}$/, // Canada (123-456-789 - SIN)
      /^\d{9}$/, // Mexico (CURP - Unique Population Registry Code)

      // Europe
      /^[A-Z]{2}\d{6}[A-Z]$/, // UK (AB123456C - NIN)
      /^\d{11}$/, // Germany (12345678901 - Steuer ID)
      /^\d{11}$/, // France (12345678901 - INSEE)
      /^\d{9}$/, // Spain (123456789 - DNI)
      /^[A-Z]\d{8}$/, // Italy (A12345678 - Codice Fiscale)
      /^\d{10}$/, // Netherlands (BSN - 1234567890)
      /^\d{11}$/, // Poland (PESEL - 12345678901)

      // Asia
      /^\d{9}$/, // China (Resident ID 123456789)
      /^\d{10}$/, // Saudi Arabia (1234567890 - Iqama)
      /^[A-Z]\d{8}$/, // Hong Kong (A1234567)
      /^\d{12}$/, // Indonesia (NIK - 123456789012)
      /^\d{10}$/, // Japan (My Number - 1234567890)
      /^\d{6}-\d{2}-\d{4}$/, // Malaysia (123456-12-1234 - NRIC)
      /^\d{9}$/, // UAE (Emirates ID 123456789)
      /^\d{2}-\d{7}$/, // Philippines (SSS 12-3456789)

      // Africa
      /^\d{13}$/, // South Africa (1234567890123 - SA ID)
      /^\d{14}$/, // Egypt (National ID 12345678901234)
      /^\d{11}$/, // Nigeria (NIN 12345678901)

      // Australia & Oceania
      /^[A-Z]{2}\d{7}$/, // Australia (AB1234567 - TFN)
      /^\d{8}$/, // New Zealand (12345678 - IRD)

      // South America
      /^\d{11}$/, // Brazil (CPF - 123.456.789-01)
      /^\d{8}-\d{1}$/, // Argentina (DNI - 12345678-1)
      /^\d{10}$/, // Chile (RUN - 1234567890)
    ];

    return cnicPatterns.some((pattern) => pattern.test(val)) ? null : "Invalid CNIC/ID format for your region";
  };

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
      teamMemberName: (val) => (val.trim().length < 1 ? "Please Enter Value Of Length Greater Than 0" : null),
      teamMemberTitle: (val) => (val.trim().length < 1 ? "Please Enter Value Of Length Greater Than 0" : null),
      teamMemberEmail: (val) =>
        /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(val) ? null : "Please Enter A Valid Email",
      // teamMemberPhone, must be 11 digits and digits only
      officialEmail: (val) =>
        !val || /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6}$/i.test(val) ? null : "Please Enter A Valid Email",

      // ###### phone #########

      // teamMemberPhone: (val) =>
      //   /^(\+92|0)?3\d{2}-?\d{7}$/.test(val)
      //     ? null
      //     : "Please Enter A Valid Phone Number",
      teamMemberPhone: validatePhoneNumber,

      // officialPhone: (val) =>
      //   !val || /^(\+92|0)?3\d{2}-?\d{7}$/.test(val)
      //     ? null
      //     : "Please Enter A Valid Phone Number",

      officialPhone: validatePhoneNumber,

      teamMemberFacebookLink: (val) => (val.trim().length < 1 ? "Please Enter Value Of Length Greater Than 0" : null),
      teamMemberTwitterLink: (val) => (val.trim().length < 1 ? "Please Enter Value Of Length Greater Than 0" : null),
      teamMemberLinkedInLink: (val) => (val.trim().length < 1 ? "Please Enter Value Of Length Greater Than 0" : null),
      memberPriority: (val) => val.length < 1,
      // CNIC: (val) =>
      //   val.length < 1 || val?.length > 15 ? "Please Enter CNIC" : null,
      CNIC: validateCNIC,
      IDCardFront: (value) => (value ? null : "Please Upload Cnic front image"),
      IDCardBack: (value) => (value ? null : "Please Upload Cnic back image"),
      teamMemberImage: (value) => (value ? null : "Please Upload User photo"),
      bankAccountNumber: (val) =>
        !val || /^[0-9]{8,36}$/.test(val) ? null : "Sanndard Bank account number must be 8-36 digits",
      // IBAN: (val) =>
      //   !val || /^PK\d{2}[A-Z0-9]{4}\d{16}$/.test(val)
      //     ? null
      //     : "Please enter a valid Pakistani IBAN",
      IBAN: validateIBAN,
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
        return axios.patch(`${backendUrl + `/api/v1/teamMember/${state?.data?._id}`}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
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
      <PageHeader label={state?.isUpdate ? "Edit Team Member" : "Add Team Member"} />
      <form onSubmit={form.onSubmit((values) => handleAddTeam.mutate(values))}>
        <Divider my="xl" label="Personal Information" labelPosition="center" fz={"lg"} />
        {/* <Flex gap={"xl"} justify={"space-around"}> */}
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "36rem", cols: 1, spacing: "sm" }]}>
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
          {/* <InputField
            label={"Contact Number"}
            placeholder={"Enter Contact Number"}
            form={form}
            component={InputMask}
            // mask={"0399-9999999"}x
            withAsterisk
            validateName={"teamMemberPhone"}
          /> */}
          <InputField
            label={"Contact Number"}
            placeholder={"Enter Contact Number"}
            form={form}
            component={PhoneInput}
            mask={"+999999999999"} // Adjust based on user needs
            withAsterisk
            validateName={"teamMemberPhone"}
          />

          {/* <InputField
            label={"CNIC"}
            placeholder={"CNIC (13 digits)"}
            form={form}
            component={InputMask}
            // mask={"99999-9999999-9"}
            withAsterisk
            validateName={"CNIC"}
          /> */}

          <InputField
            label="National Identity Number"
            placeholder="Enter National Identity Number"
            form={form}
            maxLength={17}
            validateName="CNIC"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9A-Za-z-]/g, "");
            }}
            withAsterisk
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
        <Divider my="xl" label="Contact Information" labelPosition="center" fz={"lg"} />
        <SimpleGrid cols={2}>
          <InputField
            label={"Official Email"}
            placeholder={"Official Email"}
            form={form}
            validateName={"officialEmail"}
          />
          {/* <InputField
            label={"Official Phone"}
            placeholder={"Official Phone"}
            form={form}
            validateName={"officialPhone"}
            component={InputMask}
            mask={"0399-9999999"}
          /> */}

          <InputField
            label={"Offical Phone"}
            placeholder={"Enter Official Phone"}
            form={form}
            component={PhoneInput}
            mask={"+999999999999"} // Adjust based on user needs
            // withAsterisk
            validateName={"officialPhone"}
          />
        </SimpleGrid>
        <Divider my="xl" label="Social Links" labelPosition="center" fz={"lg"} />
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
        <Divider my="xl" label="Account Information" labelPosition="center" fz={"lg"} />
        <SimpleGrid cols={2}>
          <InputField label={"Bank Name"} placeholder={"Bank Name"} form={form} validateName={"bankName"} />
          <InputField label={"Bank Branch"} placeholder={"Bank Branch"} form={form} validateName={"bankBranch"} />
          <InputField
            label={"Bank Account Number"}
            placeholder={"Bank Account Number"}
            form={form}
            validateName={"bankAccountNumber"}
          />
          {/* <InputField
            label={"IBAN"}
            placeholder={"IBAN"}
            form={form}
            validateName={"IBAN"}
          /> */}

          <InputField label="IBAN" placeholder="Enter IBAN" form={form} validateName="IBAN" />
        </SimpleGrid>
        <Divider my="xl" label="Emergency Contact" labelPosition="center" fz={"lg"} />
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
          <InputField label={"Address"} placeholder={"Address"} form={form} validateName={"kinAddress"} />
        </SimpleGrid>

        <Divider my="xl" label="ID Card Information" labelPosition="center" fz={"lg"} />

        <Group position="center">
          <DropZone form={form} folderName={"teamMember"} name={"teamMemberImage"} label="Team Member Image" />
          <DropZone form={form} folderName={"teamMember"} name={"IDCardFront"} label="ID Card Front Image" />
          <DropZone form={form} folderName={"teamMember"} name={"IDCardBack"} label="ID Card Back Image" />
        </Group>
        <Group position="right" mt={"md"}>
          <Button label={"Cancel"} variant={"outline"} onClick={() => navigate(routeNames.general.viewTeams)} />
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
