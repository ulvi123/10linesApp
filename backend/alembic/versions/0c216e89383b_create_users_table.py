"""Create users table

Revision ID: 0c216e89383b
Revises: 7700afe4154e
Create Date: 2025-01-09 20:40:35.656497

"""
from typing import Sequence, Union
from uuid import UUID
import uuid
from sqlalchemy.dialects.postgresql import UUID
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0c216e89383b'
down_revision: Union[str, None] = '7700afe4154e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("email", sa.String(), unique=True, index=True),
        sa.Column("hashed_password", sa.String()),
    )
def downgrade() -> None:
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
