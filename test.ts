const one = async (arg1: string, arg2: string) => {
  return arg1 + arg2
}

function two(arg1: string): Promise<void>
function two(arg1: string, arg2?: number): Promise<number>
function two(arg1: string, arg2?: string): Promise<string>
async function two(arg1: string, arg2?: string | number): Promise<void | number | string> {
  console.log(arg1, arg2)
  if (typeof arg2  === 'number') {
    return arg2
  }
  if (typeof arg2 === 'string') {
    return arg2
  }
}

type TwoArgs = Parameters<typeof two>
type TwoReturn = ReturnType<typeof two>

const twolike = (...args: TwoArgs): TwoReturn => {
  return two(...args)
}

twolike('1')

export {}
