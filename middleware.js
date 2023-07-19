import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("token");
  const userType = request.cookies.get("userType");
  const remember = request.cookies.get("remember");
  const origin = request.headers.origin;
  /*if (request.nextUrl.pathname.includes("/login")){
    if(remember){
      if(userType === "guest"){
        return NextResponse.redirect(new URL("/visita", request.url))
      }
      else if (userType === "admin"){
        return NextResponse.redirect(new URL("/administrador", request.url))
      }
      else if (userType === "root"){
        return NextResponse.redirect(new URL("/superadministrador", request.url))
      }
    }
  }*/

  if (request.nextUrl.pathname.includes("/visita")) {
    if (token === undefined || userType === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userType === "guest") {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}validateGuest`;
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
  } else if (request.nextUrl.pathname.includes("/administrador")) {
    if (token === undefined || userType === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userType === "admin") {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}validateAdmin`;
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
        console.log(response.data);
        return NextResponse.next();
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL("/login"), request.url);
      }
    }
  } else if (request.nextUrl.pathname.includes("/superadministrador")) {
    if (token === undefined || userType === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userType === "root") {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}validateRoot`;
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
        const absoluteURL = new URL("/login", "http://" + origin).toString();
        return NextResponse.redirect(absoluteURL, request.url);
      }
    }
  }
  return NextResponse.next();
}
