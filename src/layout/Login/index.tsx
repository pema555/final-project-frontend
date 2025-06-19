import eventManger from '../../assets/EventManagement.png'
import AuthForm from '../../components/AuthForm'

const LogIn = () => {
  return (
    <main className='flex flex-col lg:flex-row items-center w-full justify-between'>
      <div className='w-full lg:w-[50%] px-10'>
        <section className='flex-center size-full max-sm:px-6'>
          <AuthForm type='sign-in' />
        </section>
      </div>
      <section className='w-full lg:w-[50%]'>
        <img
          src={eventManger}
          loading='lazy'
          className='rounded-l-xl object-contain'
          alt='Auth image'
        />
      </section>
    </main>
  )
}

export default LogIn
