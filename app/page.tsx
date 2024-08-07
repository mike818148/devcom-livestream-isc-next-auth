import { AccessRequestForm } from "@/components/component/access-request-form";
import { getServerSession } from "next-auth";
import { Configuration, ConfigurationParameters, RequestableObject, RequestableObjectsApi, RequestableObjectsApiListRequestableObjectsRequest } from "sailpoint-api-client";
import { authOptions } from "./api/auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  //console.log(session);
  const configurationParams: ConfigurationParameters = {
    baseurl: process.env.ISC_BASE_API_URL,
    accessToken: session?.accessToken,
  }
  //console.log(configurationParams);
  const apiConfig = new Configuration(configurationParams);
  const param: RequestableObjectsApiListRequestableObjectsRequest = {
    identityId: session?.user.uid,
    types: ["ROLE"],
    statuses: ["AVAILABLE"]
  }

  const api = new RequestableObjectsApi(apiConfig);
  const requestableRoles: RequestableObject[] = (await api.listRequestableObjects(param)).data;

  console.log(requestableRoles);
  return (
    <AccessRequestForm name={session?.user.name!} email={session?.user.email!} selectableRoles={requestableRoles} />
  );
}

