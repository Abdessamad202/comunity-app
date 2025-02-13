const Steps = () => {
  return (
    <div className="text-center mb-8">
          <div className="flex justify-around items-center steps">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-2 step">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <span>1</span>
              </div>
              <p className="text-xs text-gray-600">Register</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-2 step">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">
                <span>2</span>
              </div>
              <p className="text-xs text-gray-600">Verify Email</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-2 step">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">
                <span>3</span>
              </div>
              <p className="text-xs text-gray-600">Complete Profile</p>
            </div>
          </div>
        </div>
  )
}

export  {Steps}