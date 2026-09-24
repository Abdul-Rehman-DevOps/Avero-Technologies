export type PortalAnnouncement = {
  id: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  author: string;
  date: string;
};

export type DirectoryPerson = {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
};

const announcements: PortalAnnouncement[] = [
  {
    id: "a-1",
    title: "Portal access",
    summary: "Employee portal is live for Avero staff.",
    body: "Use your assigned work credentials to sign in. Contact leadership if you need an account provisioned.",
    category: "IT",
    author: "Leadership",
    date: "2026-09-23",
  },
  {
    id: "a-2",
    title: "Updated laptop encryption baseline",
    summary: "All endpoints must meet the disk encryption checklist.",
    body: "Confirm FileVault/BitLocker status and open a ticket if remediations are blocked.",
    category: "Security",
    author: "Security Engineering",
    date: "2026-09-12",
  },
];

/** Real people only — extend as you hire. */
const directory: DirectoryPerson[] = [
  {
    id: "d-0",
    name: "Chief Executive Officer",
    title: "CEO",
    department: "Corporate",
    location: "Remote",
    email: "contact@avero.com",
  },
  {
    id: "d-1",
    name: "Abdul Rehman",
    title: "Chief Technology Lead",
    department: "Engineering",
    location: "Remote",
    email: "contact@avero.com",
  },
];

export async function getAnnouncements() {
  return announcements;
}

export async function getDirectory() {
  return directory;
}
