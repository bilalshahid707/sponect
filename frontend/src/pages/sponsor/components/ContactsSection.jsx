import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactsSection = ({ contacts }) => {
  return (
    <div className="rounded-md w-full bg-white p-4 md:p-5 drop-shadow-xl">
      <div className="flex flex-col gap-4">
        <h4 className="text-dark text-xl w-max font-semibold relative">
          Contacts
          <div className="absolute w-1/2 bg-primary -bottom-1 left-0 h-0.5"></div>
        </h4>

        {contacts?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 rounded-md  border-dark border p-3"
              >
                {/* Avatar */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dark shrink-0 text-white font-bold text-sm">
                  {contact.name?.charAt(0).toUpperCase()}
                </div>

                {/* Contact Info */}
                <div className="flex flex-col w-full">
                  <p className="text-sm font-bold text-dark">
                    {contact.name}
                  </p>

                  <p className="text-xs text-dark font-semibold gap-1 flex items-center mt-1">
                    <Mail size={14} className="text-dark shrink-0" />
                    {contact.email}
                  </p>

                  <p className="text-xs text-dark font-semibold gap-1 flex items-center mt-1">
                    <Phone size={14} className="text-dark shrink-0" />
                    {contact.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-600">
              No contacts provided
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsSection;
