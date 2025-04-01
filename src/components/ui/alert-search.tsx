/** @format */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AlertSearchProps {
  slug: string;
  shortDescription: string;
  name: string;
  imageUrl: string;
}

const AlertSearch: React.FC<AlertSearchProps> = ({
  slug,
  shortDescription,
  name,
  imageUrl,
}) => {
  return (
    <Link href={`/san-pham/${slug}`}>
      <Alert className="flex items-center space-x-4">
        <div className="w-[60px] h-[60px] relative ">
          <Image
            src={imageUrl}
            alt={name}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div>
          <AlertTitle>{name}</AlertTitle>
          <AlertDescription>{shortDescription}</AlertDescription>
        </div>
      </Alert>
    </Link>
  );
};
export default AlertSearch;
