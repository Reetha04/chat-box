export default function ChatUserInfoHeader({receiver}) {
    return( 
        <div className="bg-white user-info-header px-5 py-3">
        <div className="flex justify-between">
            <div className="flex items-center">
  
                {
                                    receiver?.avatar!==undefined?
                                 <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" width="50" /> 
                                 :
                                 <i className="fa fa-user-circle text-gray-300 text-5xl"></i>

                                }
                <h3 className="text-gray-400 tex-md pl-4">{receiver?.name}</h3>
            </div>
            <div>
                <i className="fa fa-message text-violet-300"></i>

                <i className="fa fa-video text-gray-200 ml-3"></i>

                <i className="fa fa-phone text-gray-200 ml-3"></i>
            </div>
        </div>
    </div>
    )

}