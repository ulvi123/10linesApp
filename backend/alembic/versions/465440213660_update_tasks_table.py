"""Update tasks table

Revision ID: 465440213660
Revises: 0c216e89383b
Create Date: 2025-01-10 14:26:40.411078

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '465440213660'
down_revision: Union[str, None] = '0c216e89383b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE TYPE IF NOT EXISTS taskstatus AS ENUM ('pending', 'idle', 'in_progress', 'completed')")
    
    op.create_table(
        'tasks',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('status', postgresql.ENUM('pending', 'idle', 'in_progress', 'completed', name='taskstatus'), 
                 nullable=False, default='pending'),
        sa.Column('location', sa.String(), nullable=False),
        sa.Column('area_dimensions', postgresql.JSON(), nullable=False),
        sa.Column('quality_requirements', postgresql.JSON(), nullable=False),
    )



def downgrade() -> None:
    op.drop_table('tasks')
    op.execute('DROP TYPE taskstatus')
