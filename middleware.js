import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const userType = request.cookies.get("userType");
  if (request.nextUrl.pathname.includes("/visita")) {
    if (token === undefined || userType === undefined) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    if (userType === "guest") {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}validateGuest`
        const response = await axios.post(
          url,
          {
            token: token,
            user_type: userType,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
            },
          }
        );
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL("/login"), request.url);
      }
    }
  }

  return NextResponse.next();
}
