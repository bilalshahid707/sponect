import React from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PostedBy = ({ user }) => {
  return (
    <div className="rounded-md w-full bg-white p-4 md:p-5 drop-shadow-xl">
      {/* Title */}

      <div className="flex flex-col gap-4">
      <h2 className="text-xl w-max font-semibold text-dark relative">
        Posted By
        <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
      </h2>

    <div className="flex flex-col gap-2 w-full">

      <div className="flex items-center gap-2">
        {/* Avatar */}
        {user?.avatar?.url ? (
          <img
            src={user?.avatar?.url}
            className="w-16 h-16 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-dark flex items-center justify-center shrink-0">
            <span className="text-white text-lg font-semibold">
              {(user?.fullName || user?.username)?.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Name and Designation */}
        <div className="flex flex-col justify-start">
          <h3 className="text-lg font-semibold text-dark">
            {user?.fullName || user?.username}
          </h3>
          {user?.designation && (
            <p className="text-sm text-dark-lighter">{user?.designation}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 w-full">
        <Button size="lg" className="flex-1 bg-dark hover:bg-dark/90 text-white font-semibold rounded-md flex items-center justify-center p-4 cursor-pointer">
          <MessageCircle size={18} />
          Get in Touch
        </Button>
        <Button variant="outline" className="flex-1 text-dark border-dark font-semibold rounded-md flex items-center justify-center p-4 cursor-pointer">
          <Mail size={18} />
          Email
        </Button>
      </div>
    </div>
      {/* Avatar and Name Section */}

      </div>
    </div>
  );
};

export default PostedBy;
