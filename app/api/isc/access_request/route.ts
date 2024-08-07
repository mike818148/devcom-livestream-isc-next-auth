import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/authOptions";
import {
  AccessRequestType,
  AccessRequestsApi,
  Configuration,
  ConfigurationParameters,
} from "sailpoint-api-client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const body = await request.json();

  const configurationParams: ConfigurationParameters = {
    baseurl: process.env.ISC_BASE_API_URL,
    accessToken: session?.accessToken,
  };
  //console.log(configurationParams);
  const apiConfig = new Configuration(configurationParams);
  const api = new AccessRequestsApi(apiConfig);
  const res = await api.createAccessRequest({
    accessRequest: {
      requestedFor: [session?.user.id!],
      requestType: AccessRequestType.GrantAccess,
      requestedItems: [
        {
          type: "ROLE",
          id: body.roleId,
        },
      ],
    },
  });

  if (res.status.toString().startsWith("2")) {
    return NextResponse.json({ message: "success" }, { status: 201 });
  } else {
    return NextResponse.json({ message: "failed" }, { status: 500 });
  }
}
