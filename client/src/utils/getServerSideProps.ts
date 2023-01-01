import { setCookie } from "cookies-next";

export const AdminSignInOutAuthCheck = ({ req }: any) => {
  const xsrfToken = req?.cookies['XSRF-TOKEN']
  setCookie('XSRF-TOKEN', xsrfToken)
  const path = req?.url

  const admin = path.includes('admin')
  const dashboard = path.includes('dashboard')
  const manageUser = path.includes('manage-user')
  const managePost = path.includes('manage-post')
  const employmentStatus = path.includes('employment-status')

  if ((dashboard || manageUser || managePost || employmentStatus) && !xsrfToken) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  if (admin && !xsrfToken) {
    return {
      props: {}
    }
  }

  if ((dashboard || manageUser || managePost || employmentStatus) && xsrfToken) {
    return {
      props: {}
    }
  }

  if (admin && xsrfToken) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  }

  if (!xsrfToken) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export const UserSignInOutAuthCheck = async ({ req }: any) => {
  const xsrfToken = req?.cookies['XSRF-TOKEN']
  setCookie('XSRF-TOKEN', xsrfToken)
  const path = req?.url

  const login = path.includes('login')
  const register = path.includes('register')

  if ((login || register) && !xsrfToken) {
    return {
      props: {}
    }
  }

  if (!xsrfToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if ((login || register) && xsrfToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
